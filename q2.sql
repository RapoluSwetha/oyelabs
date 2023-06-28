SELECT c.customerId, c.name, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR  ',') AS subjects
FROM customers c
LEFT JOIN mapping m ON c.customerId = m.customerId
LEFT JOIN subjects s ON m.subjectId = s.subjectId
GROUP BY c.customerId, c.name
ORDER BY c.name;
