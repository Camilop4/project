namespace :earthquake do
    desc "Obtener y persistir datos de terremotos"
    task fetch_and_persist: :environment do
      require_relative '../earthquake_data_fetcher'

      start_date = "2024-03-01"
      end_date = "2024-03-31"

      fetcher = EarthquakeDataFetcher.new(start_date, end_date)
      fetcher.fetch_and_persist_data
    end
end