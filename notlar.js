//Notları saklamak için bir dizi oluşturuluyor.
var notlar = [];

//Sayfa yüklendiğinde notları yükle
$(document).ready(function() {
    yukleNotlar();

    //Not ekle düğmesi tıklandığında notu ekle
    $('#notEkle').click(function() {
        var notBasligi = $('#notBasligi').val();
        var notIcerigi = $('#notIcerigi').val();

        //Notun başlığı ve içeriği alanları boş değilse notu ekle
        if (notBasligi !== '' && notIcerigi !== '') {
            var yeniNot = {
                baslik: notBasligi,
                icerik: notIcerigi
            };

            notlar.push(yeniNot);
            kaydetNotlar();
            yukleNotlar();

            //Not ekledikten sonra alanları temizle
            $('#notBasligi').val('');
            $('#notIcerigi').val('');
        }
    });

    //Not sil düğmesi tıklandığında notu sil
    $(document).on('click', '.not-sil', function() {
        var index = $(this).data('index');
        notlar.splice(index, 1);
        kaydetNotlar();
        yukleNotlar();
    });

    //Not ara düğmesi tıklandığında notları ara
    $('#notAra').on('keyup', function() {
        var notAra = $(this).val().toLowerCase();
        $('#notListesi li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(notAra) > -1)
        });
    });
});

//Notları yerel depolamada sakla
function kaydetNotlar() {
    localStorage.setItem('notlar', JSON.stringify(notlar));
}

//Kaydedilmiş notları yükle
function yukleNotlar() {
    $('#notListesi').html('');
    var kaydedilmisNotlar = JSON.parse(localStorage.getItem('notlar'));
    if (kaydedilmisNotlar !== null) {
        notlar = kaydedilmisNotlar;
    }
    for (var i = 0; i < notlar.length; i++) {
        var not = notlar[i];
        $('#notListesi').append('<li><h3>' + not.baslik + '</h3><p>' + not.icerik + '</p><button class="not-sil" data-index="' + i + '">Notu Sil</button></li>');
    }
}
