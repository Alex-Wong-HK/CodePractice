interface IUsers {
    [id: number]: {
        name: string,
        age:number
    }
}

const usersObject:IUsers = {
    1:{name:"alex",age:18},
    2:{name:"Peter",age:19}
}

for (const [key, value] of Object.entries(usersObject)) {
    console.log({value})
}
