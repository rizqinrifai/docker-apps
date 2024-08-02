# Setting Up Prometheus with Docker Compose

# Introduction to Prometheus¶
Prometheus is an open-source monitoring and alerting toolkit, widely used for its powerful querying language, efficient storage, and ease of integration with various metrics sources.

# Docker Compose Configuration for Prometheus¶
This Docker Compose setup deploys Prometheus in a Docker container, along with a specified configuration file for custom monitoring settings.

# Key Components of the Configuration¶
## Service: Prometheus¶
- Image: prom/prometheus is the Docker image used for Prometheus.
- Command: --config.file=/etc/prometheus/prometheus.yml specifies the configuration file used by Prometheus.
- Ports:
9090:9090 maps port 9090 on the host to port 9090 in the container, where Prometheus's web interface is accessible.
- Volumes:
- ./prometheus:/etc/prometheus mounts the local Prometheus configuration directory to the container.
- prom_data:/prometheus provides persistent storage for Prometheus data.
- Restart Policy: unless-stopped ensures that Prometheus restarts automatically unless explicitly stopped.
# Prometheus Configuration¶
- Global Settings: Defines the global scrape interval, timeout, and evaluation interval.
- Alerting: Configuration for alert managers.
- Scrape Configs: Defines the jobs and targets for Prometheus to scrape metrics from.
# Deploying Prometheus¶
- Save the Docker Compose configuration in a docker-compose.yml file and the Prometheus configuration in a prometheus.yml file.
- Run docker compose up -d to start Prometheus in detached mode.
- Access Prometheus's web interface via http://<host-ip>:9090.
# Configuring and Using Prometheus¶
After deployment, you can modify the prometheus.yml file to add new targets and change scrape intervals as needed. Prometheus provides a versatile platform for monitoring your infrastructure.