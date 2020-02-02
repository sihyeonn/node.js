// ES 5

function onChange(id) {
  axios.get(`/board/get/${id}`)
  .then(function (res) { // then Promise
    // handle success
    console.log(res);
    document.querySelector('#id').value = res.data.id;
    document.querySelector('#title').value = res.data.title;
    document.querySelector('#comment').value = res.data.comment;
    document.querySelector('#writer').value = res.data.writer;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

/*
async function onChange(id) {
  try {
    const response = await axios.get(`/board/${id}`);
  } catch(e) {
    next
  }
}
*/
