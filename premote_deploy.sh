#!/bin/bash

data="{\"site_id\": \"f88b52a6-8d5a-4c37-bd8b-48e043827ac6\"}"

deploys=$("netlify api listSiteDeploys --data \"$data\"")

echo $deploys