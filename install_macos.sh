#!/bin/bash

# Get current username
USER_NAME=$(whoami)

# Define paths
DESTINATION="/Users/$USER_NAME/Library/Application Support/Steam/steamapps/common/Sid Meier's Civilization VII/CivilizationVII.app/Contents/Resources"

# Copy 'Base' and 'DLC' folders, force overwrite (-R for recursive, -f for force)
cp -Rf "./Base" "$DESTINATION/"
cp -Rf "./DLC" "$DESTINATION/"

echo "Base and DLC folders have been copied and replaced successfully!"