package middleware

import (
	"encoding/base64"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func performRequest(r http.HandlerFunc, req *http.Request) *httptest.ResponseRecorder {
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func base64Encode(data []byte) string {
	return base64.RawURLEncoding.EncodeToString(data)
}

func TestAuthRequired_RejectsNoneAlgorithm(t *testing.T) {
	gin.SetMode(gin.TestMode)

	header := `{"alg":"none","typ":"JWT"}`
	payload := `{"user_id":1}`
	tokenStr := base64Encode([]byte(header)) + "." + base64Encode([]byte(payload)) + "."

	r := gin.New()
	r.GET("/test", AuthRequired("secret"), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "Bearer "+tokenStr)
	w := performRequest(r.ServeHTTP, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", w.Code)
	}
}

func TestAuthRequired_RejectsNoToken(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.New()
	r.GET("/test", AuthRequired("secret"), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	w := performRequest(r.ServeHTTP, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", w.Code)
	}
}

func TestAuthRequired_AcceptsHS256Token(t *testing.T) {
	gin.SetMode(gin.TestMode)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": float64(1),
	})
	tokenStr, _ := token.SignedString([]byte("secret"))

	r := gin.New()
	r.GET("/test", AuthRequired("secret"), func(c *gin.Context) {
		uid, _ := c.Get("user_id")
		if uid != uint(1) {
			t.Errorf("expected user_id 1, got %v", uid)
		}
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "Bearer "+tokenStr)
	w := performRequest(r.ServeHTTP, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}
}

func TestOptionalAuth_SkipsOnNoneAlgorithm(t *testing.T) {
	gin.SetMode(gin.TestMode)

	header := `{"alg":"none","typ":"JWT"}`
	payload := `{"user_id":1}`
	tokenStr := base64Encode([]byte(header)) + "." + base64Encode([]byte(payload)) + "."

	r := gin.New()
	r.GET("/test", OptionalAuth("secret"), func(c *gin.Context) {
		_, exists := c.Get("user_id")
		if exists {
			t.Error("expected no user_id for invalid token")
		}
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "Bearer "+tokenStr)
	w := performRequest(r.ServeHTTP, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}
}
