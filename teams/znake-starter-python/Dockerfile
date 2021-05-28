FROM python:3.9-alpine3.13

COPY . /src
WORKDIR /src
RUN pip3 install -r requirements.txt

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 9090
ENTRYPOINT ["python", "/src/znake-ai.py"]
