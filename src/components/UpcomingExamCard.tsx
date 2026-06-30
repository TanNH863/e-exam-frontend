"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Exam } from "@/dto/exam.dto";
import { CalendarIcon, ClipboardListIcon, ClockIcon } from "@/icons/icons";
import { getTimeDisplay } from "@/utils/date";
import ConfirmModal from "@/components/ConfirmModal";

interface Props {
	examInfo: Exam;
}

export default function UpcomingExamCard({ examInfo }: Props) {
	const router = useRouter();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
	const [countdown, setCountdown] = useState<string>("");

	useEffect(() => {
		const updateCountdown = () => {
			const now = new Date();
			const start = new Date(examInfo.startTime);
			const diff = start.getTime() - now.getTime();

			if (diff <= 0) {
				setCountdown("");
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			if (days > 0) {
				setCountdown(`${days}d ${hours}h`);
			} else if (hours > 0) {
				setCountdown(`${hours}h ${minutes}m`);
			} else {
				setCountdown(`${minutes}m ${seconds}s`);
			}
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		return () => clearInterval(interval);
	}, [examInfo.startTime]);
	const getExamStatus = (startTime: string | Date, duration: number) => {
		const now = new Date();
		const start = new Date(startTime);
		const end = new Date(start.getTime() + duration * 60000);

		if (now < start) {
			return "Upcoming";
		} else if (now >= start && now <= end) {
			return "Ongoing";
		} else {
			return "Ended";
		}
	};

	return (
		<>
			<div
				key={examInfo.id}
				className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
			>
				<div className="p-6">
					<div className="flex items-start">
						<ClipboardListIcon />
						<div>
							<h3 className="text-lg font-semibold text-gray-900">
								{examInfo.title}
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								{examInfo.description}
							</p>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-between">
						<div className="flex space-x-4">
							<span className="flex items-center text-sm text-gray-700">
								<CalendarIcon />
								{getTimeDisplay(new Date(examInfo.startTime))}
							</span>
							<span className="flex items-center text-sm text-gray-700">
								<ClockIcon />
								{examInfo.duration} mins
							</span>
							{countdown && (
								<span className="flex items-center text-sm font-semibold text-orange-600">
									Starts in: {countdown}
								</span>
							)}
						</div>
						{
							(() => {
								const status = getExamStatus(examInfo.startTime, examInfo.duration);
								if (status === "Upcoming") {
									return (
										<div className="flex items-center space-x-4">
											<button
												disabled
												className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 shadow-md cursor-not-allowed"
											>
												Not Started
											</button>
										</div>
									);
								}

								if (status === "Ongoing") {
									return (
										<>
											<button
												onClick={() => {
													setSelectedExam(examInfo);
													setConfirmOpen(true);
												}}
												className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
											>
												Start Exam
											</button>

											<ConfirmModal
												open={confirmOpen && selectedExam?.id === examInfo.id}
												title={`Start ${examInfo.title}`}
												message={`You are about to start the exam "${examInfo.title}". Once started, the timer will begin. Do you want to proceed?`}
												confirmText="Start"
												cancelText="Cancel"
												onCancel={() => {
													setConfirmOpen(false);
													setSelectedExam(null);
												}}
												onConfirm={() => {
													setConfirmOpen(false);
													// navigate to take exam page
													router.push(`/student/take-exam/${examInfo.id}`);
												}}
											/>
										</>
									);
								}

								return (
									<button className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 shadow-md cursor-default">
										Closed
									</button>
								);
							})()
						}
					</div>
				</div>
			</div>
		</>
	)
}