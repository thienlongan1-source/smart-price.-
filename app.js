// ĐÃ DÁN ID CỦA THIÊN LONG VÀO ĐÂY
const ACCESSTRADE_ID = "6136638414227853852"; 

function quetGiaNangCao() {
    const keywordInput = document.getElementById('product-name');
    const keyword = keywordInput.value.trim();
    
    if (keyword === "") {
        alert("Nhập tên sản phẩm đi Long ơi!");
        return;
    }

    const encodedKeyword = encodeURIComponent(keyword);
    const priority = document.querySelector('input[name="priority"]:checked').value;

    // 1. Tạo link tìm kiếm gốc của sàn
    let shopeeRaw = `https://shopee.vn/search?keyword=${encodedKeyword}`;
    let lazadaRaw = `https://www.lazada.vn/tag/${encodedKeyword}`;

    // 2. Thêm bộ lọc giá rẻ/bán chạy
    if (priority === "cheap") {
        shopeeRaw += "&sortBy=price&order=asc";
        lazadaRaw += "/?sort=priceasc";
    } else if (priority === "sales") {
        shopeeRaw += "&sortBy=sales";
        lazadaRaw += "/?sort=orderscountdesc";
    }

    // 3. Tạo link Affiliate (Kiếm tiền) thông qua AccessTrade
    // Link này sẽ dẫn người dùng qua hệ thống của AT rồi mới vào Shopee/Lazada để tính hoa hồng cho bạn
    const finalShopee = `https://fast.accesstrade.com.vn/deep_link/v4?link=${encodeURIComponent(shopeeRaw)}&aff_sid=${ACCESSTRADE_ID}`;
    const finalLazada = `https://fast.accesstrade.com.vn/deep_link/v4?link=${encodeURIComponent(lazadaRaw)}&aff_sid=${ACCESSTRADE_ID}`;

    // 4. Hiển thị kết quả
    document.getElementById('link-shopee').href = finalShopee;
    document.getElementById('link-lazada').href = finalLazada;
    document.getElementById('search-keyword').innerText = keyword;
    document.getElementById('result-box').style.display = 'block';
    
    document.getElementById('result-box').scrollIntoView({ behavior: 'smooth' });
}
