exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(fib()),
    };
    return response;
};

function fib(n=10) {
    let a = 0;
    let b = 1;
    let c;
    let fibString = '';
    for(let i=0; i<n; i++){
        if (i === n - 1) fibString += a;
        else fibString += a + ' '; 
        c = a;
        a = b; 
        b += c;
    }
    return fibString;
}
