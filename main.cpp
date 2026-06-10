#include <windows.h>
#include <iostream>
#include <fstream>
#include <ctime>

using namespace std;

double getMemoryUsage()
{
    MEMORYSTATUSEX memInfo;
    memInfo.dwLength = sizeof(MEMORYSTATUSEX);

    GlobalMemoryStatusEx(&memInfo);

    return memInfo.dwMemoryLoad;
}

int main()
{
    cout << "Smart OS Resource Detector Started..." << endl;

    srand((unsigned)time(NULL));

    while(true)
    {
        double memoryUsage = getMemoryUsage();

        // Temporary CPU value
        int cpuUsage = rand() % 100;

        ofstream file("../frontend/system_data.json");

        if(file.is_open())
        {
            file << "{\n";
            file << "  \"cpu\": " << cpuUsage << ",\n";
            file << "  \"memory\": " << memoryUsage << "\n";
            file << "}";

            file.close();
        }

        cout
            << "CPU: "
            << cpuUsage
            << "% | Memory: "
            << memoryUsage
            << "%"
            << endl;

        Sleep(2000);
    }

    return 0;
}