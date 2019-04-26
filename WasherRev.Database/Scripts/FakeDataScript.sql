-- FAKE DATA
USE WasherRev;

-- Building
INSERT INTO Building VALUES ('Bud1', 'Streett', 16, '11-222', 1)
INSERT INTO Building VALUES ('Bud2', 'Streeadst', 1, '11-222', 1)
INSERT INTO Building VALUES ('Bud3', 'Streetads', 2, '11-222', 1)
INSERT INTO Building VALUES ('Bud4', 'Streasdet', 3, '11-222', 1)
INSERT INTO Building VALUES ('Bud5', 'Stasdreet', 15, '11-222', 1)
INSERT INTO Building VALUES ('Bud6', 'Strasdeet', 9, '11-222', 1)
INSERT INTO Building VALUES ('Bud7', 'Streadet', 16, '11-222', 0)
INSERT INTO Building VALUES ('Bud8', 'Streasdet', 16, '11-222', 1)
INSERT INTO Building VALUES ('Bud9', 'Streasdet', 16, '11-222', 1)
INSERT INTO Building VALUES ('Bud10', 'Stsgreet', 16, '11-222', 0)
INSERT INTO Building VALUES ('Bud11', 'Strasdaeet', 16, '11-222', 1)

-- Room
INSERT INTO Room VALUES ('Room1', 2, 3, 1, 1)
INSERT INTO Room VALUES ('Room2', 1, 2, 2, 1)
INSERT INTO Room VALUES ('Room3', 0, 4, 3, 1)
INSERT INTO Room VALUES ('Room4', 1, 1, 2, 1)
INSERT INTO Room VALUES ('Room5', 7, 5, 2, 1)
INSERT INTO Room VALUES ('Room6', 1, 3, 4, 1)
INSERT INTO Room VALUES ('Room7', 2, 2, 5, 1)

-- Producer
INSERT INTO Producer VALUES ('prod1', '666-666-666')

--Washer
INSERT INTO Washer values ('washer1', 1, 1, '01-02-2018', 1, null)
INSERT INTO Washer values ('washer2', 2, 1, '02-02-2018', 1, null)
INSERT INTO Washer values ('washer3', 3, 1, '03-02-2018', 1, null)
INSERT INTO Washer values ('washer4', 2, 1, '04-02-2018', 1, null)
INSERT INTO Washer values ('washer5', 2, 1, '05-02-2018', 1, null)
INSERT INTO Washer values ('washer6', 4, 1, '06-02-2018', 1, null)
INSERT INTO Washer values ('washer7', 5, 1, '07-02-2018', 1, null)