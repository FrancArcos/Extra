function add_to_cart() {
    Swal.fire({
        title: 'Añadido al carrito',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

function del_from_cart() {
    Swal.fire({
        title: 'Se quitó del carrito',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

function cancel() {
    Swal.fire({
        title: '¿Está seguro de cancelar?',
        text: 'Se cancelará la cita',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cancelar cita',
        cancelButtonText: 'No, conservar cita'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Cancelada',
            'La cita ha sido cancelada',
            'success'
          )
        }
      })
}

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }