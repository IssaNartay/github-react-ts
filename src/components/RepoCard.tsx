import React, { useState } from "react"
import { useActions } from "../hooks/actions"
import { useAppSelector } from "../hooks/redux"

export default function RepoCard({ repo }: { repo: IRepo }) {
	const { addFavourite, removeFavourite } = useActions()

	const { favourites } = useAppSelector((state) => state.github)

	const [isFavourite, setIsFavourite] = useState(
		favourites.includes(repo.html_url)
	)

	const addToFavourite = (
		event: React.MouseEventHandler<HTMLButtonElement>
	) => {
		event.preventDefault()
		addFavourite(repo.html_url)
    setIsFavourite(true)
	}

	const removeFromFavourite = (
		event: React.MouseEventHandler<HTMLButtonElement>
	) => {
		event.preventDefault()
		removeFavourite(repo.html_url)
    setIsFavourite(false)
	}

	return (
		<div className="border pu-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
			<a href={repo.html_url} target="_blank" rel="noreferrer">
				<div className="flex justify-between items-center">
					<img
						className="w-[50px]"
						src={repo.owner.avatar_url}
						alt={repo.owner.login}
					/>
					<h2 className="text-lg font-bold">{repo.full_name}</h2>
					<p className="text-sm">
						Forks: <span className="font-bold mr-2">{repo.forks}</span>
						Watchers: <span className="font-bold">{repo.watchers}</span>
					</p>
				</div>
				<p className="text-sm font-thin">{repo?.description}</p>

				{!isFavourite && (
					<button
						className="rounded py-2 px-4 bg-yellow-400 mr-3 hover:shadow-md transition-all"
						onClick={addToFavourite}
					>
						Add
					</button>
				)}
				{isFavourite && (
					<button
						className="rounded py-2 px-4 bg-red-400 hover:shadow-md transition-all"
						onClick={removeFromFavourite}
					>
						Remove
					</button>
				)}
			</a>
		</div>
	)
}
