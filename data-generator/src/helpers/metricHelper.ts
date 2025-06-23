function logMetrics() {
    const mem = process.memoryUsage();
    const rssMb = mem.rss / 1024 / 1024;

    let level = 'Low';
    if (rssMb > 200) {
        level = 'Critic';
    } else if (rssMb > 150) {
        level = 'Moderated';
    }

    console.log('Uso de memoria (MB):', {
        rss: rssMb.toFixed(2),
        riskLevel: level
    });
}

export default logMetrics;