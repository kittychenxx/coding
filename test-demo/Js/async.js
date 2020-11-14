async function ensure1(a) {
    new Promise(
        (resolve, reject) => {
            console.log(a);
            resolve(a);
            console.log(a);
        }
    ).then(res => {
        console.log(res);
    })
}

async function ensure2(a) {
    await ensure1(a);
    console.log(a);
}
for (let i of [1, 2]) {
    ensure2(i);
}

