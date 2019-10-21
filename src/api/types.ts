export type Queuee = {
	name: string,
	mobile: string,
	strength: number | null
}

export type Queue = {
	name: string,
	isQueueeStrengthable: boolean
}

export type QueueForAccessor = Queue & { passCode: string }