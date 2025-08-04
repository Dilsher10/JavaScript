export function fetchProducts(){
    return new Promise((resolve) => {
        resolve([
            {id:1, name: 'T-Shirt', price: 20.99},
            {id:2, name: 'Jeans', price: 30.99},
            {id:3, name: 'Watch', price: 35.99},
            {id:4, name: 'Shoes', price: 52.99},
        ]);
    })
}


