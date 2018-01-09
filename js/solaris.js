$(document).ready(function () {

    $modelSpecs = '';
    $modelPrice = 0;
    $modelPriceUSD = $('#modelPriceUSD');
    $modelSpecsHolder = $('#modelSpecs');
    $modelPriceHolder = $('#modelPrice');
    $colorSelect = $('#colorSelect .colorItem');
    $carImg = $('#imgHolder img');

    $currencyURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
    $rurUsdRate = 0;

    $('#autoForm input').on('change', function () {
        calculatePrice();
        compileSpecs();
    });

    $colorSelect.on('click', function () {
        $imgPath = $(this).attr('data-color');
        $carImg.attr('src', 'img/solaris/' + $imgPath + '.png');
    });

    function calculatePrice() {
        $modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
        $modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
        $modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

        $modelPriceEngine = parseInt($modelPriceEngine);
        $modelPriceTransmission = parseInt($modelPriceTransmission);
        $modelPricePackage = parseInt($modelPricePackage);

        $modelPrice = $modelPriceEngine + $modelPriceTransmission + $modelPricePackage;

        $price = $modelPrice.toLocaleString('ru');

        $modelPriceHolder.html($price + ' &#8381;');
    }

    function compileSpecs() {
        $modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
        $modelSpecs += ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
        $modelSpecs += ', ' + $('input[name=package]:checked + label', '#autoForm').text();

        $modelSpecsHolder.html($modelSpecs);
    }

    $.ajax({
        url: 'https://www.cbr-xml-daily.ru/daily_json.js',
        cache: false,
        success: function (html) {
            console.log(html.Valute.USD.Value);
        }
    });

    compileSpecs();
    calculatePrice();
});