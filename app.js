// Thay đổi chuỗi này thành Affiliate ID thực tế của bạn trên Accesstrade
const ACCESSTRADE_ID = "YOUR_AFFILIATE_ID_HERE"; 

function quetGiaNangCao() {
    // 1. Lấy và kiểm tra dữ liệu đầu vào
    const keywordInput = document.getElementById('product-name');
    const keyword = keywordInput.value.trim();
    
    if (keyword === "") {
        alert("⚠️ Bậc Thầy vui lòng nhập tên sản phẩm cần kiểm tra!");
        keywordInput.focus();
        return;
    }

    // 2. Lấy tiêu chí lọc do người dùng chọn (radio button)
    const priority = document.querySelector('input[name="priority"]:checked').value;

    // 3. Hiển thị khu vực kết quả
    document.getElementById('search-keyword').innerText = keyword;
    const resultBox = document.getElementById('result-box');
    resultBox.style.display = 'block';

    // 4. Khởi tạo biến URL và Text trạng thái
    let shopeeRaw = "";
    let lazadaRaw = "";
    let statusText = "";

    // 5. Logic xử lý URL cực kỳ thông minh của Bậc Thầy
    const encodedKeyword = encodeURIComponent(keyword);

    switch (priority) {
        case "cheap":
            // Lọc giá từ thấp lên cao
            shopeeRaw = `https://shopee.vn/search?keyword=${encodedKeyword}&sortBy=price&order=asc`;
            lazadaRaw = `https://www.lazada.vn/tag/${encodedKeyword}/?sort=priceasc`;
            statusText = "Đã áp dụng bộ lọc: Giá rẻ nhất hệ thống";
            break;
            
        case "sales":
            // Lọc theo lượng bán ra
            shopeeRaw = `https://shopee.vn/search?keyword=${encodedKeyword}&sortBy=sales`;
            lazadaRaw = `https://www.lazada.vn/tag/${encodedKeyword}/?sort=orderscountdesc`;
            statusText = "Đã áp dụng bộ lọc: Sản phẩm bán chạy nhất";
            break;
            
        case "rating":
            // Lọc sản phẩm có đánh giá cao (Uy tín)
            shopeeRaw = `https://shopee.vn/search?keyword=${encodedKeyword}&ratingFilter=4`;
            lazadaRaw = `https://www.lazada.vn/tag/${encodedKeyword}/?rating=4`;
            statusText = "Đã áp dụng bộ lọc: Shop uy tín từ 4-5 sao";
            break;
    }

    // 6. Chuyển đổi thành Link Kiếm Tiền (Affiliate Deep Link)
    // Sử dụng cấu trúc V4 của Accesstrade
    const shopeeAffiliateLink = `https://fast.accesstrade.com.vn/deep_link/v4?link=${encodeURIComponent(shopeeRaw)}&utm_source=SmartPriceMaster&aff_sid=${ACCESSTRADE_ID}`;
    const lazadaAffiliateLink = `https://fast.accesstrade.com.vn/deep_link/v4?link=${encodeURIComponent(lazadaRaw)}&utm_source=SmartPriceMaster&aff_sid=${ACCESSTRADE_ID}`;

    // 7. Cập nhật Giao diện (Gắn link và đổi text)
    document.getElementById('shopee-status').innerText = statusText;
    document.getElementById('lazada-status').innerText = statusText;
    
    document.getElementById('link-shopee').href = shopeeAffiliateLink;
    document.getElementById('link-lazada').href = lazadaAffiliateLink;

    // 8. Tự động cuộn màn hình xuống vùng kết quả mượt mà
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Tính năng UX nâng cao: Bắt sự kiện phím "Enter" trên bàn phím ảo của điện thoại
document.getElementById("product-name").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn hành vi mặc định của form
        quetGiaNangCao();
        document.getElementById("product-name").blur(); // Ẩn bàn phím sau khi Enter
    }
});
