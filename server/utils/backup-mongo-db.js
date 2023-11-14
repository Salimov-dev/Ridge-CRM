const backupMongoDB = () => {
  const now = new Date();
  const backupFileName = `${now.toISOString().replace(/:/g, "-")}.gzip`;
  const archivePath = path.join(BACKUP_DIR, backupFileName);

  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--archive=${archivePath}`,
    "--gzip",
    `--uri=${config.get("mongoUri")}`,
  ]);

  child.stdout.on(`data`, (data) => {
    console.log(`stdout:/n`, data);
  });
  child.stderr.on(`data`, (data) => {
    console.log(`stderr:/n`, Buffer.from(data).toString());
  });
  child.on("error", (error) => {
    console.log(`error:/n`, error);
  });
  child.on("exit", (code, signal) => {
    if (code) console.log(`Process exit with code:`, code);
    else if (signal) console.log(`Process killed with signal:`, signal);
    else console.log(`Backup is successful`);
  });

  // Удаляем старые резервные копии, если их количество превышает MAX_BACKUPS
  fs.readdir(BACKUP_DIR, (err, files) => {
    if (!err) {
      files.sort(); // Сортируем имена файлов
      while (files.length > MAX_BACKUPS) {
        const fileToDelete = path.join(BACKUP_DIR, files.shift());
        fs.unlink(fileToDelete, (err) => {
          if (err) {
            console.error(`Error deleting old backup: ${err}`);
          }
        });
      }
    }
  });
};

export default backupMongoDB;
