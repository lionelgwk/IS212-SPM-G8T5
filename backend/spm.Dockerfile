FROM python:3-slim
WORKDIR /
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . /
CMD [ "python", "./spm.py" ]
