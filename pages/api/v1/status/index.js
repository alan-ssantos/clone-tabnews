function status(request, response) {
  response.status(200).json({ message: "Não é magia!" });
}

export default status;
