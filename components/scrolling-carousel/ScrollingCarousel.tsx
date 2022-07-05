import React, {
	FunctionComponent,
	MouseEvent,
	useState,
	useRef,
	useCallback,
	ReactElement,
} from 'react';

import styles from './ScrollingCarousel.module.css';

enum SlideDirection {
	Right = -1,
	Left = 1,
}
type Item = ReactElement;


export const ScrollingCarousel: FunctionComponent<SliderProps> = ({
	children,
	className,
	leftIcon,
	rightIcon,
}: SliderProps) => {
	const slider = useRef<HTMLDivElement>(null);

	const getOuterWidth = (el: HTMLElement) => {
		const style = getComputedStyle(el);
	
		return (
			el.offsetWidth +
			(parseInt(style.marginLeft, 10) || 0) +
			(parseInt(style.marginRight, 10) || 0)
		);
	}

	const showArrows = (): Arrows => {
		const sliderElement = slider.current;
		return {
			left: !!sliderElement && sliderElement.scrollLeft > 0,
			right:
				!!sliderElement &&
				sliderElement.scrollWidth >
					sliderElement.scrollLeft + sliderElement.offsetWidth,
		};
	};
	const [showArrow, setShowArrow] = useState<Arrows>(showArrows());

	const onScroll = (_: Event) => {
		setShowArrow(showArrows());
	};

	const ref = useCallback(
		(node: any) => {
			if (node !== null) {
				Object.defineProperty(slider, 'current', { value: node });
				setShowArrow(showArrows());
				node.addEventListener('scroll', onScroll);
			}
		},
		[slider, children],
	);

	const calculateSlideAmount = (direction: SlideDirection): number => {
		const _slider = slider.current!;
		const currentView =
			direction === SlideDirection.Left
				? _slider.scrollLeft + _slider.offsetWidth
				: _slider.scrollLeft;

		const childNodes = Array.from(_slider.children) as HTMLElement[];
		let nodeWidthSum = 0;
		for (const node of childNodes) {
			const nodeWidth = getOuterWidth(node);
			nodeWidthSum += nodeWidth;

			if (nodeWidthSum >= currentView) {
				const showingPart =
					direction === SlideDirection.Left
						? nodeWidthSum - currentView
						: nodeWidth;

				return (_slider.offsetWidth - showingPart) * direction;
			}
		}

		return _slider.offsetWidth;
	};

	const slide = (direction: SlideDirection) => {
		const slideAmount = calculateSlideAmount(direction);
		const start = slider.current!.scrollLeft;
		smoothHorizontalScroll(500, slideAmount, start);
	};

	const smoothHorizontalScroll = (time: number, amount: number, start: number) => {
		let curTime = 0;
		for (let scrollCounter = 0; curTime <= time; scrollCounter++) {
			window.setTimeout(
				smoothHorizontalScrollBehavior,
				curTime,
				(scrollCounter * amount) / 100 + start,
			);
			curTime += time / 100;
		}
	};

	const smoothHorizontalScrollBehavior = (amount: number) => {
		slider.current!.scrollLeft = amount;
	};

	const getArrow = (
		direction: SlideDirection,
		data: string,
		element?: ReactElement,
	) => {
		return (
			<div data-arrow={data} onClick={() => slide(direction)}>
				{element ?? <button />}
			</div>
		);
	};

	return (
		<div className={`${styles.sliderBase} ${className}`} data-testid="carousel">
			{showArrow.left && getArrow(SlideDirection.Right, 'left', leftIcon)}
			{showArrow.right && getArrow(SlideDirection.Left, 'right', rightIcon)}
			<div
				ref={ref}
				className={styles.slider}
			>
				{children}
			</div>
		</div>
	);
};

export interface SliderProps {
	children: Item[];
	className?: string;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
}

export type Arrows = {
	left: boolean;
	right: boolean;
};


