/**
 * Fetch request module
 * @module req
 */

/**
 * @function req
 * @description Return response for HTTP methods
 * @param {string} endpoint - API endpoint
 * @param {Object} method - Dictionary of request method
 * @returns {Object} - response in Json format
 */
export const req = (endpoint, method) => {
  fetch(endpoint, method)
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
