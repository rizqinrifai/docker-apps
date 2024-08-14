FROM grafana/grafana-oss:11.1.3

USER root

# Set default theme to light
ENV GF_USERS_DEFAULT_THEME=light

# Copy custom icons
COPY custom/icon.svg /usr/share/grafana/public/img/grafana_icon.svg
COPY custom/bg.svg /usr/share/grafana/public/img/g8_login_light.svg

# Customize app title and login title
RUN find /usr/share/grafana/public/build/ -name "*.js" \
    -exec sed -i 's|AppTitle="Grafana"|AppTitle="Medhawi Monitoring"|g' {} \; \
    -exec sed -i 's|LoginTitle="Welcome to Grafana"|LoginTitle="Medhawi Monitoring"|g' {} \;

# Remove footer links
RUN find /usr/share/grafana/public/build/ -name "*.js" \
    -exec sed -i 's|\[{target:"_blank",id:"documentation".*grafana_footer"}\]|\[\]|g' {} \; \
    -exec sed -i 's|({target:"_blank",id:"license",.*licenseUrl})|()|g' {} \; \
    -exec sed -i 's|({target:"_blank",id:"version",.*CHANGELOG.md":void 0})|()|g' {} \;

USER grafana
