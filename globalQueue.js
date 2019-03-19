const queue = []

//take data parameter and add
export function add(data){
    queue.push(data)
}

//Take index parameter and remove
export function remove(index){
    if (index > -1){
	return queue.splice(index, 1)
    }
    return queue.shift()
}

export function exportQueue(){
    return queue
}

export function importQueue(arr) {
    queue = arr
}
