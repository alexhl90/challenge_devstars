FROM node:20.16.0-bullseye
WORKDIR /app



RUN pip install --no-cache-dir --upgrade -r requirements.txt
#RUN pip install --no-cache-dir --upgrade -r requirements-test.txt

COPY ./api .

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000", "--reload"]