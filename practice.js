const str = "ahmad,hamad,waleed|khalid,ali,ahmad";
let res =[];
    console.log(str.split('|'));
    str.split('|').forEach((arr) => {
        let temp = []
        arr.split(',').forEach((name) => {
            console.log(name);
            temp.push({value : name});
        });
        res.push(temp);
    });
    console.log(res);

let out =""
res.map((arr) => {
    arr.map((name) => {
        console.log(name.value);
        out+=name.value + ",";
    });
    out = out.slice(0, -1);
    console.log(out);
    
    out+="|";
});
console.log(out);
