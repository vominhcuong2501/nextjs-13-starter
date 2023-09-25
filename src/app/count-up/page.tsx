"use client";
import { useEffect, useState } from "react";

function CounterAnimation({
	initialValue,
	duration,
	countTo,
	isVisible,
}: {
	initialValue: number;
	duration: number;
	countTo: number;
	isVisible: boolean;
}) {
	const [count, setCount] = useState(initialValue);

	useEffect(() => {
		let startTimestamp: number;

		if (isVisible) {
			// Bắt đầu đếm khi isVisible là true
			const animate = (timestamp: number): void => {
				if (!startTimestamp) startTimestamp = timestamp;
				const elapsed = timestamp - startTimestamp;

				if (elapsed < duration) {
					const progress = elapsed / duration;
					const nextCount = Math.floor(
						initialValue + (countTo - initialValue) * progress
					);
					setCount(nextCount);
					requestAnimationFrame(animate);
				} else {
					setCount(countTo);
				}
			};

			requestAnimationFrame(animate);
		}

		return () => {};
	}, [duration, initialValue, isVisible]);

	return <div className="counter">{count}</div>;
}

export default function Achivement() {
	const data = {
		tn_title: "Our achivement",
		tn_description: "Trusted by travelers around the world",
		tn_list: [
			{
				tn_number: 50000,
				tn_text: "Customers",
				tn_icon: "+",
			},
			{
				tn_number: 98,
				tn_text: "Satisfaction Rating",
				tn_icon: "%",
			},
			{
				tn_number: 150,
				tn_text: "Countries Served",
				tn_icon: "+",
			},
			{
				tn_number: 10,
				tn_text: "Years of experience",
				tn_icon: "+",
			},
			{
				tn_number: 500,
				tn_text: "Employees",
				tn_icon: "+",
			},
		],
	};
	const { tn_title, tn_description, tn_list } = data;
	const [isAchievementVisible, setIsAchievementVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const achievementElement = document.querySelector(".achievement");
			if (!isAchievementVisible && achievementElement) {
				const rect = achievementElement.getBoundingClientRect();
				const windowHeight =
					window.innerHeight || document.documentElement.clientHeight;
				if (rect.top >= 0 && rect.bottom <= windowHeight) {
					setIsAchievementVisible(true);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isAchievementVisible]);

	return (
		<div>
			<div style={{ height: "2000px" }}></div>
			<div className="achievement bg-background-6 py-[30px] lg:py-[60px]">
				<div className="max-w-[1232px] mx-auto px-4 text-center">
					<h2 className="text-28 lg:text-44 font-bold leading-1-2 text-neutral-8">
						{tn_title}
					</h2>
					<p className="text-14 lg:text-16 font-normal mt-2 lg:mt-4 leading-1-4 text-red-1">
						{tn_description}
					</p>
					<ul className="grid grid-cols-2 lg:grid-cols-5 mt-[30px] lg:mt-10 xl:gap-6 gap-x-5 gap-y-4">
						{tn_list.map((item, index) => (
							<li
								key={item.tn_text}
								className={`shadow-secondary bg-neutral-1 rounded-2xl h-[120px] lg:h-[160px] px-[15px] flex flex-col justify-center items-center gap-y-4 ${
									index === 0 ? "col-span-2 lg:col-span-1" : ""
								}`}
							>
								<h3 className="text-28 xl:text-44 font-semibold leading-1-2 text-red-1">
									<CounterAnimation
										initialValue={0}
										duration={2000}
										countTo={item.tn_number}
										isVisible={isAchievementVisible}
									/>
								</h3>
								<p className="text-16 xl:text-16 font-semibold leading-1-4 text-neutral-8">
									{item.tn_text}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
