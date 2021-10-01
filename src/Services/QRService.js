import ApiService from "./ApiService";

const QRService = {
  get() {
    return ApiService.get("/short");
  },
  getById(id) {
    return ApiService.get(`/short/${id}`);
  },
  create(values) {
    return ApiService.post("/short", values);
  },
  delete(id) {
    return ApiService.delete(`/short/${id}`);
  },
  update(values, id) {
    return ApiService.post(`/short/update/${id}`, values);
  },
};
export default QRService;
