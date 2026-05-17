const ACCESSTRADE_ID = "6136638414227853852"; 

function quetGiaNangCao() {
    const keywordInput = document.getElementById('product-name');
    const keyword = keywordInput.value.trim();
    
    if (keyword === "") {
        alert("Nhập tên sản phẩm đi Long ơi!");
        return;
    }

    const encodedKeyword = encodeURIComponent(keyword);
    
    // Link gốc tìm kiếm
    let shopeeRaw = "https://shopee.vn/search?keyword=" + encodedKeyword;
    let lazadaRaw = "https://www.lazada.vn/tag/" + encodedKeyword;

    // Link Affiliate kiếm tiền
    const finalShopee = "https://fast.accesstrade.com.vn/deep_link/v4?link=" + encodeURIComponent(shopeeRaw) + "&aff_sid=" + ACCESSTRADE_ID;
    const finalLazada = "https://fast.accesstrade.com.vn/deep_link/v4?link=" + encodeURIComponent(lazadaRaw) + "&aff_sid=" + ACCESSTRADE_ID;

    // Hiển thị nút bấm
    document.getElementById('link-shopee').href = finalShopee;
    document.getElementById('link-lazada').href = finalLazada;
    document.getElementById('search-keyword').innerText = keyword;
    document.getElementById('result-box').style.display = 'block';
}
