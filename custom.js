    let allContainerCart = document.querySelector('.products');
    let containerBuyCart = document.querySelector('.card-items');
    let priceTotal = document.querySelector('.price-total')
    let amountProduct = document.querySelector('.count-product');
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
    let buyThings = [];
    let totalCard = 0;
    let countProduct = 0;   


    
    function addProduct(e){
        e.preventDefault();
        if (e.target.classList.contains('btn-add-cart')) {
            
            const selectProduct = e.target.parentElement; 
            readTheContent(selectProduct);        
        }
        
    }

    function deleteProduct(e) {
        if (e.target.classList.contains('delete-product')) {
            const deleteId = e.target.getAttribute('data-id');

            buyThings.forEach(value => {
                if (value.id == deleteId) {
                    let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                    totalCard =  totalCard - priceReduce;
                    totalCard = totalCard.toFixed(2);
                }
            });
            buyThings = buyThings.filter(product => product.id !== deleteId);
            
            countProduct--;
        }
        
        if (buyThings.length === 0) {
            priceTotal.innerHTML = 0;
            amountProduct.innerHTML = 0;
        }
        loadHtml();
    }

    function readTheContent(product){
        const infoProduct = {
            image: product.querySelector('div img').src,
            title: product.querySelector('.title').textContent,
            price: product.querySelector('div p span').textContent,
            id: product.querySelector('a').getAttribute('data-id'),
            amount: 1
        }

        totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
        totalCard = totalCard.toFixed(2);

        const exist = buyThings.some(product => product.id === infoProduct.id);
        if (exist) {
            const pro = buyThings.map(product => {
                if (product.id === infoProduct.id) {
                    product.amount++;
                    return product;
                } else {
                    return product
                }
            });
            buyThings = [...pro];
        } else {
            buyThings = [...buyThings, infoProduct]
            countProduct++;
        }
        loadHtml();
        //console.log(infoProduct);
    }

    function loadHtml(){
        clearHtml();
        buyThings.forEach(product => {
            const {image, title, price, amount, id} = product;
            const row = document.createElement('div');
            row.classList.add('item');
            row.innerHTML = `
                <img src="${image}" alt="">
                <div class="item-content">
                    <h5>${title}</h5>
                    <h5 class="cart-price">${price}$</h5>
                    <h6>Amount: ${amount}</h6>
                </div>
                <span class="delete-product" data-id="${id}">X</span>
            `;

            containerBuyCart.appendChild(row);

            priceTotal.innerHTML = totalCard;

            amountProduct.innerHTML = countProduct;
        });
    }
    function clearHtml(){
        containerBuyCart.innerHTML = '';
    }

    function descontar() {
        let agotado = "agotado";
        let poco_x5 = document.getElementById("poco_x5").innerHTML; ;
        poco_x5--;
    
        if (poco_x5 === 0) {
            document.getElementById("poco_x5").innerHTML = agotado;
        } else {
            document.getElementById("poco_x5").innerHTML = poco_x5;
        }
    }

    /* 
    const products = [
        { title: "Celular Xiaomi Poco X5 5G 256Gb / 8Ram / 48Mp Color Verde" },
        { title: "Celular Apple iPhone 13 128gb Cámara 12mpx Color Azul" },
        { title: "Audifonos Inpods 12 Bluetooth 5.0 Multicolor Touch Color Negro" },
        { title: "Audifonos Inalambricos AUT120 Bluetooth 1Hora Negro" },
        { title: "Celular Xiaomi Note 12 4/128gb - Garantia 1 año" },
        { title: "Audífonos Auriculares Manos Libres Bluetooth Tipo Airpods Tactiles" },
        { title: "Celular Tecno Spark 10c 128Gb 16 Ram Negro + Audífonos" },
        { title: "Celular Xiaomi Redmi 12 8GB/256GB" },
        { title: "Celular Xiaomi Poco F5 256Gb 12Ram 64Mp Color Negro" },
        { title: "Celular Tecno Camon 20 256 GB 16 Ram Negro + Audífonos" },
        { title: "Audifonos inalambricos Bluetooth in-ear F9-5C Negro" },
        { title: "Celular Infinix Note 30 Pro 16G+256GB Negro" },
        { title: "Celular HYUNDAI L651 4G 64GB 3 RAM + Airpods" },
        { title: "Celular Tecno Pop 5 2G+32G Azul" },
        { title: "Celular Samsung Galaxy A34 128GB 6 Ram + Audífonos" },
        { title: "Celular Reacondicionado iPhone SE 2020 128GB 12 Meses De Garantía Color Negro" },
        { title: "Celular Reacondicionado iPhone 7 PLUS 128GB 12 Meses De Garantía Color ORO" },
        { title: "Celular Motorola G23 128Gb / 4Ram / 50mpx Gris + Audífonos" },
        { title: "Celular Infinix Note 12 128gb / 8 Ram / 50mp Color Blanco" },
        { title: "Audifonos Xiaomi Redmi Airdots 3 True Wireless Bluetooth Earphones" },
    ];
*/