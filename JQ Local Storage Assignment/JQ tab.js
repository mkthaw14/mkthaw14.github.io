$(function() {

    var contents = $('.content');
    var links = $('.link');

    contents.hide();
    contents.first().slideDown();
    links.first().addClass("active");


    links.on("click", function() {
        console.log('click');

        contents.slideUp();
        var content_id = $(this).attr("href");
        var current_content = $(content_id);
        current_content.slideDown();
        //console.log(content_id);

        $('ul li a').removeClass('active');
        $(this).addClass("active");

        event.preventDefault();
    });

    
    //console.log(contents);

    //Local Storage
    $('.atc').on("click", function() {
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        let productImgPath = $(this).attr('data-imgPath');

        console.log(productImgPath);

        let item = {
            id : id, 
            name : name,
            price : price,
            productImgPath : productImgPath,
            qty: 1
        }

        console.log(item);

        let cart = localStorage.getItem('cart');
        console.log(cart);
        let myArr = '';

        if(cart != null)
        {
            myArr = JSON.parse(cart);
            console.log(myArr);
            let sameItem = false;
            let itemIndex = -1;

            for(let i = 0; i < myArr.length; i++)
            {
                if(myArr[i].id == item.id)
                {
                    itemIndex = i;
                    sameItem = true;
                }
            }

            if(sameItem)
            {
                myArr[itemIndex].qty++;
            }
            else
            {
                myArr.push(item);
            }
            
        }
        else
        {
            myArr = [];   
            myArr.push(item);
        }


        //JS Object => JSON String
        let myArrString = JSON.stringify(myArr);
        //console.log(myArrString);

        localStorage.setItem('cart', myArrString);
        alertUserForAddingCart();
        showCartNotification();
        getdata();
    });

    //Get Data From LS
    function getdata()
    {
        let cart = localStorage.getItem('cart');
        let table = $('#cart table');
        let checkoutBtn = $('.checkout');
        let cartStatus = $('#cartStatus');

        if(cart != null)
        {
            console.log('Yes');
            $('.grid-cart').show();
            $('.cart-total-container').show();
            
            checkoutBtn.show();
            cartStatus.hide();

            let items = JSON.parse(cart);
            let row1 = '';
            let row2 = '';
            let total = 0;
            let i = 0;

            // for ([index, item] of myArr.entries())
            // {
            //     total += item.qty * item.price;
            //     let subtotal = item.qty * item.price;
            //     row += `
            //     <tr>
            //         <td>
            //             <button class="remove" data-id="${index}">Remove</button> 
            //             ${++i}
            //         </td>
            //         <td>${item.name}</td>
            //         <td>$ ${item.price}</td>
            //         <td>
            //             <input type="number" min="1" value="${item.qty}" data-id="${index}"
            //             class="updateqty"
            //         </td>
            //         <td>$ ${subtotal.toFixed(2)}</td>
            //     </tr> `;
            // }

            // row += `<tr>
            //         <td colspan="4"> Total Amount</td>
            //         <td>$ ${total.toFixed(2)}</td>
            //     </tr>`;
            // $('tbody').html(row);

            
            for(let i = 0; i < items.length; i++)
            {
                total += items[i].qty * items[i].price;
                let subtotal = items[i].qty * items[i].price;
                row1 += drawitemGrid(items[i], i, subtotal.toFixed(2));
                row2 = drawcartTotalGrid(total.toFixed(2));
            }

            $('.grid-cart').html(row1);
            $('.cart-total-container').html(row2);
        }
        else
        {
            console.log('No');
            cartStatus.show();
            $('.grid-cart').hide();
            $('.cart-total-container').hide();
            checkoutBtn.hide();
        }

        console.log(cart);
    }

    getdata();

    //Remove
    $('.grid-cart').on("click", ".remove" , function() {
        //alert('h1');
        let index = $(this).data('id');
        //console.log(index);
        let cart = localStorage.getItem('cart');
        let myArr = JSON.parse(cart);
        //Delete one row

        myArr.splice(index, 1);
        if(myArr.length == 0)
        {
            localStorage.removeItem('cart');   
        }
        else
        {
            //JS Object => JSON String
            let myArrString = JSON.stringify(myArr);
            //console.log(myArrString);
            localStorage.setItem('cart', myArrString);
        }



        showCartNotification();
        getdata();
    });

    //increase - decrease Qty
    $('.grid-cart').on("change", ".updateqty", function() {
        let index = $(this).data('id');
        //console.log(index)
        let qty = Number($(this).val());
        let cart = localStorage.getItem('cart');
        let myArr = JSON.parse(cart);
        myArr[index].qty = qty;
        //JS Object => JSON String
        let myArrString = JSON.stringify(myArr);
        //console.log(myArrString)
        localStorage.setItem('cart', myArrString);
        showCartNotification();
        getdata();
    });

    //checkout 
    $('.cart-total-container').on('click', ".checkout", function() {
        checkOut();
    });

    //activate sweet alert
    function alertUserForAddingCart()
    {
        Swal.fire({
            title: 'This item has been added to your cart',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
        });
    }

    function checkOut()
    {
        Swal.fire({
            title: 'Are you sure?',
            text: "We will not refund for the product once you have made purchase!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Purchase Confirmed!'
                )

                localStorage.removeItem('cart');
                showCartNotification();
                getdata();
            }
        });
    }

    function showCartNotification(show)
    {
        let cart = localStorage.getItem('cart');
        let cartNotification = $('#notification');

        let myArr = [];
        myArr = JSON.parse(cart);
        console.log(cart != null);
        console.log(cartNotification);
        if(cart != null)
        {
            cartNotification.css("z-index", "99");
            cartNotification.text(`${getTotalQty(myArr)}`);
            
        }
        else
        {
            cartNotification.css("z-index", "-4");
        }

        console.log(cartNotification.css('z-index'));
    }

    function getTotalQty(myArr)
    {
        let total = 0;
        for(let i = 0; i < myArr.length; i++)
        {
            total += myArr[i].qty;
        }

        return total;
    }

    showCartNotification();

    function drawitemGrid(item, index, subtotal)
    {
        let element = `
        <div class="cart-img">
        <img src="${item.productImgPath}" alt="">
        </div>

        <div class="cart-item-description">
            <h1>${item.name}</h1>
            <h4>$${item.price}</h4>
            <button class="remove" data-id="${index}">Remove</button>
        </div>

        <div class="cart-qty">
            <input type="number" min="1" value="${item.qty}" data-id="${index}"
            class="updateqty">
        </div>

        <div class="cart-price">
            <p>$${subtotal}</p>
        </div>
        `;

        return element;
    }

    function drawcartTotalGrid(total)
    {
        let element = `
        <div>

        </div>
        <div class="element-checkout">
            <button class="checkout">Checkout</button>
        </div>
        <div class="element-total">
            <h3>Total : ${total}</h3>
        </div>
        </div>
        `;

        return element;
    }
});