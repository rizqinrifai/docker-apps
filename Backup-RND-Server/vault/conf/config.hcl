ui  = true
disable_mlock = true

listener "tcp" {
    address     = "[::]:8200"
    tls_disable = true
}

storage "file" {
    path = "/vault/data"
}