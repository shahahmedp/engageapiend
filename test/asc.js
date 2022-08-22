let arr=[
    {
    content:'A',product:'P'},
    {content:'B',product:'Q'},
    {content:'A',product:'R'},
    {content:'B',product:'T'}
    ]
var newarr=[];
for(let i=0;i<arr.length;i++){
    for(j=i+1;j<arr.length;j++){
        if(arr[i].content==arr[j].content){
            let productlist=[]
            productlist.push(arr[i].product,arr[j].product)
            var obj={content:arr[i].content, product:productlist}
            newarr.push(obj);
        }
}
}
console.log(newarr)





