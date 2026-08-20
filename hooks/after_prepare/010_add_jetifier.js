#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const gradlePropsPath = path.join(__dirname, '..', '..', 'platforms', 'android', 'gradle.properties');

if (fs.existsSync(gradlePropsPath)) {
  let content = fs.readFileSync(gradlePropsPath, 'utf8');
  let changed = false;

  if (!content.includes('android.enableJetifier')) {
    content += '\nandroid.enableJetifier=true\n';
    changed = true;
  }
  if (!content.includes('android.useAndroidX')) {
    content += 'android.useAndroidX=true\n';
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(gradlePropsPath, content, 'utf8');
    console.log('[hook] Jetifier + AndroidX enabled in gradle.properties');
  } else {
    console.log('[hook] Jetifier already enabled');
  }
} else {
  console.log('[hook] gradle.properties not found, skipping');
}
