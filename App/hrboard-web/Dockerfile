FROM nginx:1.25-alpine

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy website files
COPY . /usr/share/nginx/html/

# Add Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80