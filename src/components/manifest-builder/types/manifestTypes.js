// @ts-check

/**
 * @typedef {Object} BlockContent
 * @property {string} [startTime]
 * @property {string} [pilot]
 * @property {string} [aircraft]
 * @property {string} [runBy]
 * @property {string} [runDate]
 * @property {string} [fieldName]
 * @property {string} [placeholder]
 * @property {Array<{id: number, position: string, passenger: string | null}>} [seats]
 * @property {Array<{seat: number, name: string, weight: number}>} [passengers]
 * @property {string[]} [passengers]
 * @property {number} [totalPassengers]
 * @property {number} [totalCrew]
 * @property {number} [fuelLoad]
 * @property {number} [fuelWeight]
 * @property {string} [duration]
 * @property {number} [maxWeight]
 * @property {{forward: number, aft: number}} [cgLimits]
 * @property {number} [basicEmptyWeight]
 * @property {number} [pilotWeight]
 * @property {number} [frontPassengers]
 * @property {number} [rearPassengers]
 * @property {number} [takeoffWeight]
 * @property {number} [landingWeight]
 * @property {Block[]} [leftColumn]
 * @property {Block[]} [rightColumn]
 */

/**
 * @typedef {Object} Block
 * @property {number} id
 * @property {string} instanceId
 * @property {string} enumString
 * @property {string} name
 * @property {React.ReactNode} icon
 * @property {string} description
 * @property {BlockContent} [params]
 * @property {BlockContent} [defaultContent]
 * @property {Block[][]} [children]
 */

/**
 * @typedef {Object} BlockRendererProps
 * @property {Block} block
 * @property {(updates: Partial<Block>) => void} onUpdate
 * @property {() => void} onRemove
 * @property {() => void} onMoveUp
 * @property {() => void} onMoveDown
 * @property {boolean} canMoveUp
 * @property {boolean} canMoveDown
 * @property {boolean} [isInColumn]
 * @property {(parentId: string, columnType: 'left' | 'right', blockId: number) => void} [onAddToColumn]
 * @property {number | null} [draggedBlock]
 */

export {};
