CREATE PROCEDURE Building_Insert(
	@Name varchar(max),
	@Street varchar(max),
	@StreetNo INT,
	@PostCode varchar(20),
	@IsActive bit
)
AS
BEGIN
	INSERT INTO [DBO].[Building]
	VALUES (@Name, @Street, @StreetNo, @PostCode, @IsActive)
END