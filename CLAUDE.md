# BruxControl Web - Contexto de Desarrollo

## Proyecto
Landing page estática para la app BruxControl (iOS/watchOS para bruxismo).

## Stack Técnico
- HTML/CSS/JS estático
- Docker + nginx:alpine
- Let's Encrypt SSL

## Repositorio
- **GitHub**: git@github.com:felixvela/bruxcontrol.git
- **Rama principal**: main

## Infraestructura de Producción

### Servidor OVH
- **IP**: 51.83.42.164
- **Usuario SSH**: ubuntu
- **Dominio**: bruxcontrol.com (+ www.bruxcontrol.com)

### Rutas en Servidor
- **Proyecto**: `/home/ubuntu/bruxcontrol-web`
- **Nginx config**: `/etc/nginx/sites-available/bruxcontrol.com`
- **SSL certs**: `/etc/letsencrypt/live/bruxcontrol.com/`

### Docker
- **Imagen**: bruxcontrol-web
- **Container**: bruxcontrol-web
- **Puerto**: 8080 (interno) -> nginx reverse proxy -> 443 (HTTPS)
- **Restart policy**: unless-stopped

## Comandos de Despliegue

### Despliegue completo (desde el servidor)
```bash
ssh ubuntu@51.83.42.164 "/home/ubuntu/bruxcontrol-web/deploy.sh"
```

### Despliegue manual paso a paso
```bash
ssh ubuntu@51.83.42.164
cd /home/ubuntu/bruxcontrol-web
git pull origin main
docker build -t bruxcontrol-web .
docker stop bruxcontrol-web && docker rm bruxcontrol-web
docker run -d --name bruxcontrol-web --restart unless-stopped -p 8080:80 bruxcontrol-web
```

### Verificar estado
```bash
# Ver container
ssh ubuntu@51.83.42.164 "docker ps | grep bruxcontrol"

# Ver logs
ssh ubuntu@51.83.42.164 "docker logs bruxcontrol-web --tail 50"

# Test HTTPS
curl -sI https://bruxcontrol.com | head -5
```

### Renovar SSL (automático, pero si es necesario)
```bash
ssh ubuntu@51.83.42.164 "sudo certbot renew"
```

## Proyecto Relacionado
- **App iOS/watchOS**: /Users/felixvela/Documents/Proyectos/BruxGuard
- **Repo app**: git@github.com:felixvela/bruxcontrolapp.git
