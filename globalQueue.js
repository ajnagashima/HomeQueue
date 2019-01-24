const queue = []

export function add(data){
    queue.push(data)
}

export function remove(data){
    const idx = queue.indexOf(data)
    if (idx > -1){
	return queue.splice(idx, 1)
    }
    return queue.shift()
}

export function move(cur, dest){
    [queue[dest], queue[cur]] =[queue[cur], queue[dest]]
}

export function exportQueue(){
    return queue
}
