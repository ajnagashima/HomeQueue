const queue = []

export function add(data){
    queue.push(data)
}

export function remove(){
    return queue.shift()
}

export function move(cur, dest){
    [queue[dest], queue[cur]] =[queue[cur], queue[dest]]
}

export function exportQueue(){
    return queue
}
