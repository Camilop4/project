require 'net/http'

class EarthquakeDataFetcher
  def initialize(start_date, end_date)
    @start_date = start_date
    @end_date = end_date
  end

  def fetch_and_persist_data
    url = URI.parse("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=#{@start_date}&endtime=#{@end_date}")
    response = Net::HTTP.get_response(url)
    data = JSON.parse(response.body)

    data["features"].each do |feature|
      properties = feature["properties"]
      geometry = feature["geometry"]["coordinates"]

      next if properties["title"].nil? || properties["url"].nil? || properties["place"].nil? || properties["magType"].nil? || geometry[0].nil? || geometry[1].nil?

      magnitude = properties["mag"]
      longitude = geometry[0]
      latitude = geometry[1]

      next unless magnitude.between?(-1.0, 10.0) && latitude.between?(-90.0, 90.0) && longitude.between?(-180.0, 180.0)

      Earthquake.create!(
        external_id: properties["id"],
        magnitude: magnitude,
        place: properties["place"],
        time: Time.at(properties["time"] / 1000),
        url: properties["url"],
        tsunami: properties["tsunami"],
        mag_type: properties["magType"],
        title: properties["title"],
        longitude: longitude,
        latitude: latitude
      )
    end
  end
end