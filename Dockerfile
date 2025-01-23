FROM mcr.microsoft.com/playwright:v1.41.0-jammy

WORKDIR /tests
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test"]