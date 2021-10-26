const d = document;

const RestFetch = {
  // SELECT - GET
  getData: async (url) => {
    try {
      let res = await fetch(url),
        json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return json;
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      console.log(`Error ${err.status}: ${message}`);
    }
  },

  // CREATE - POST
  postData: async (url, data) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        /* body: JSON.stringify({
          nombre: e.target.nombre.value,
          constelacion: e.target.constelacion.value,
        }), */
        body: JSON.stringify(data),
      };
      res = await fetch(url, options);
      json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return json.result;
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      console.log(`Error ${err.status}: ${message}`);
    }
  },

  // UPDATE -PUT
  putData: async (url, id) => {
    try {
      let options = {
        method: "PUT",
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nombre: e.target.nombre.value,
          constelacion: e.target.constelacion.value,
        }),
      };
      res = await fetch(`${url}${id}`, options);
      json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return json.result;
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      console.log(`Error ${err.status}: ${message}`);
    }
  },
  // DELETE
  deleteData: async (url, id) => {
    try {
      let options = {
        method: "DELETE",
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      };
      res = await fetch(`${url}${id}`, options);
      json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      return json.result;
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      console.log(`Error ${err.status}: ${message}`);
    }
  },
};

export default RestFetch;
