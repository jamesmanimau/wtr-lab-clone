FROM golang:1.26-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./cmd/server
RUN CGO_ENABLED=0 GOOS=linux go build -o /seed ./cmd/seed

FROM alpine:3.20
RUN apk --no-cache add ca-certificates
COPY --from=builder /server /server
COPY --from=builder /seed /seed
EXPOSE 8080
CMD ["/server"]
