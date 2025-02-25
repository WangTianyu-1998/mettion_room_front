#!/usr/bin/env sh
# 删除dist, 否则第二次会提示fatal: A branch named 'main' already exists.
rm -rf dist

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git checkout -b master
git add -A
git commit -m 'deploy'

# https://github.com/WangTianyu-1998/mettion_room_front.git
# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/WangTianyu-1998/mettion_room_front.git master:gh-pages

cd -
