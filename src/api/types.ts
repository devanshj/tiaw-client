export type RemoteFunctions = {
	"INSERT_QUEUE": {
		parameters: {
			name: string,
			isQueueeStrengthable: boolean
		},
		returns: {
			accessCode: string
		}
	},
	"GET_QUEUE_WITH_PASSCODE": {
		parameters: {
			passCode: string
		},
		returns:
			| {
				name: string,
				isQueueeStrengthable: boolean
			}
			| null
	},
	"INSERT_QUEUEE_WITH_PASSCODE": {
		parameters: {
			name: string,
			strength: number | null,
			passCode: string,
			mobile: string
		},
		returns: {
			tokenCode: string
		}
	}
}